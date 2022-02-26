/**
 * @file Controller interface for RESTful Web service API for Bookmarks resource
 */
import {Request, Response} from "express";

/**
 * @interface BookmarkControllerI defines RESTful Web service API for bookmarks resource.
 */
export default interface BookmarkControllerI {

    /**
     * Retrieves all tuits bookmarked by a user from the database and returns an array of bookmarks.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;

    /**
     * Creates a new bookmark instance
     * @param {Request} req Represents request from client, including the url parameters like tid and uid that
     * are required to insert a new instance of bookmark in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    userBookmarksTuit (req: Request, res: Response): void;

    /**
     * Removes a bookmark instance from the user account
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the logged-in user and tid identifying the primary
     * key of the tuit that need to be removed form the bookmarks list of the user
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    userUnBookmarksTuit (req: Request, res: Response): void;

    /**
     * Checks if a tuit is bookmarked by the user or not.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including boolean result
     */
    checkIfATuitIsBookmarkedByUser (req: Request, res: Response): void;

    /**
     * Removes all bookmark instances from the user account
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the logged-in user and tid identifying the primary
     * key of the tuit that need to be removed form the bookmarks list of the user
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteAllBookmarksForUser (req: Request, res: Response): void;
}