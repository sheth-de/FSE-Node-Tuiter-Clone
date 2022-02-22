import {Request, Response} from "express";

export default interface FollowControllerI {
    findFollowers (req: Request, res: Response): void;
    findFollowing (req: Request, res: Response): void;
    userFollowsUser (req: Request, res: Response): void;
    userUnfollowsUser (req: Request, res: Response): void;
};