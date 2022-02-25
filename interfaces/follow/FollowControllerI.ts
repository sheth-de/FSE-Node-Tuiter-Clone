/**
 * @file Follow Controller interface of RESTful Web service API for Follows resource
 */
import {Request, Response} from "express";

/**
 * @interface FollowControllerI defines RESTful Web service API for follows resource.
 */
export default interface FollowControllerI {

    /**
     * Retrieves all user accounts that follow the current logged-in user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follows objects
     */
    findFollowers (req: Request, res: Response): void;

    /**
     * Retrieves all user accounts that the current logged-in user follows
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follows objects
     */
    findFollowing (req: Request, res: Response): void;

    /**
     * Creates a new follows instance where the logged-in user starts following another user account
     * @param {Request} req Represents request from client, including the url parameters like uid1 and uid2
     * where uid1 is the primary key of the logged-in user and uid2 is the primary key of the user
     * that they wish to follow
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows instance that was inserted in the
     * database
     */
    userFollowsUser (req: Request, res: Response): void;

    /**
     * Removes a follows relationship instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid1 which is the primary key of the logged-in user and uid2 which is the primary key of
     * the user account that the logged-in user wants to unfollow.
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    userUnfollowsUser (req: Request, res: Response): void;
};