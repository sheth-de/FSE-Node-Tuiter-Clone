import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";

export default class FollowController implements FollowControllerI{
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/:uid/following", FollowController.followController.findFollowing);
            app.get("/api/:uid/followers", FollowController.followController.findFollowers);
            app.post("/api/:uid1/follows/:uid2", FollowController.followController.userFollowsUser);
            app.delete("/api/:uid1/follows/:uid2", FollowController.followController.userUnfollowsUser);
        }
        return FollowController.followController;
    }
    private constructor() {}

    findFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findFollowers(req.params.uid)
            .then(follows => res.json(follows));

    findFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findFollowing(req.params.uid)
            .then(follows => res.json(follows));

    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));
}