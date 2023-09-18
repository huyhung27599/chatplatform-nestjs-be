import { Inject, Injectable } from '@nestjs/common';
import { IFriendRequestService } from './friend-requests';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend, FriendRequest } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/interfaces/user';
import { IFriendsService } from 'src/friends/friends';
import {
  CancelFriendRequestParams,
  CreateFriendParams,
  FriendRequestParams,
} from 'src/utils/types';
import { FriendRequestNotFoundException } from './exceptions/FriendRequestNotFound';
import { FriendRequestException } from './exceptions/FriendRequest';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound';
import { FriendRequestPending } from './exceptions/FriendRequestPending';
import { FriendAlreadyExists } from 'src/friends/exceptions/FriendAlreadyExists';
import { FriendRequestAcceptedException } from './exceptions/FriendRequestAccepted';
import { FriendNotFoundException } from 'src/friends/exceptions/FriendNotFound';

@Injectable()
export class FriendRequestService implements IFriendRequestService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
    @Inject(Services.FRIENDS_SERVICE)
    private readonly friendsService: IFriendsService,
  ) {}

  findById(id: number): Promise<FriendRequest> {
    return this.friendRequestRepository.findOne(id, {
      relations: ['receiver', 'sender'],
    });
  }

  isPending(userOneId: number, userTwoId: number) {
    return this.friendRequestRepository.findOne({
      where: [
        {
          sender: { id: userOneId },
          receiver: { id: userTwoId },
          status: 'pending',
        },
        {
          sender: { id: userTwoId },
          receiver: { id: userOneId },
          status: 'pending',
        },
      ],
    });
  }

  getFriendRequests(id: number): Promise<FriendRequest[]> {
    const status = 'pending';
    return this.friendRequestRepository.find({
      where: [
        { sender: { id }, status },
        { receiver: { id }, status },
      ],
      relations: ['receiver', 'sender', 'receiver.profile', 'sender.profile'],
    });
  }

  async cancel({ id, userId }: CancelFriendRequestParams) {
    const friendRequest = await this.findById(id);
    if (!friendRequest) throw new FriendRequestNotFoundException();
    if (friendRequest.sender.id !== userId) throw new FriendRequestException();
    await this.friendRequestRepository.delete(id);
    return friendRequest;
  }

  async create({ user: sender, username }: CreateFriendParams) {
    const receiver = await this.userService.findUser({ username });
    if (!receiver) throw new UserNotFoundException();
    const exists = await this.isPending(sender.id, receiver.id);
    if (exists) throw new FriendRequestPending();
    if (receiver.id === sender.id)
      throw new FriendRequestException('Cannot Add Yourself');
    const isFriend = await this.friendsService.isFriends(
      sender.id,
      receiver.id,
    );
    if (isFriend) throw new FriendAlreadyExists();
    const friend = this.friendRequestRepository.create({
      sender,
      receiver,
      status: 'pending',
    });
    return this.friendRequestRepository.save(friend);
  }

  async accept({ id, userId }: FriendRequestParams) {
    const friendRequest = await this.findById(id);
    if (!friendRequest) throw new FriendRequestNotFoundException();
    if (friendRequest.status === 'accepted')
      throw new FriendRequestAcceptedException();
    if (friendRequest.receiver.id !== userId)
      throw new FriendRequestException();
    friendRequest.status = 'accepted';
    const updatedFriendRequest = await this.friendRequestRepository.save(
      friendRequest,
    );
    const newFriend = this.friendRepository.create({
      sender: friendRequest.sender,
      receiver: friendRequest.receiver,
    });
    const friend = await this.friendRepository.save(newFriend);
    return { friend, friendRequest: updatedFriendRequest };
  }

  async reject({ id, userId }: CancelFriendRequestParams) {
    const friendRequest = await this.findById(id);
    if (!friendRequest) throw new FriendNotFoundException();
    if (friendRequest.status === 'accepted')
      throw new FriendRequestAcceptedException();
    if (friendRequest.receiver.id !== userId)
      throw new FriendRequestException();
    friendRequest.status = 'rejected';
    return this.friendRequestRepository.save(friendRequest);
  }
}
