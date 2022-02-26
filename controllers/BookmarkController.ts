/**
 * @file Controller RESTful Web service API for Bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/bookmarks/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";


/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid to bookmark a tuit with mentioned tid by a user with mentioned uid</li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve an individual user's bookmarks </li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid to delete a bookmarked tuit with mentioned tid by user with mentioned uid</li>
 *     <li>GET api/users/:uid/bookmarks/:tid to check if a particular tuit is bookmarked by the user</li>
 *     <li>DELETE all the bookmarks created by user</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing user CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;


    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnBookmarksTuit);
            app.get("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.checkIfATuitIsBookmarkedByUser);
            app.delete("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.deleteAllBookmarksForUser);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {
    }

    /**
     * Retrieves all tuits bookmarked by a user from the database and returns an array of bookmarks.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Creates a new bookmark instance
     * @param {Request} req Represents request from client, including the url parameters like tid and uid that
     * are required to insert a new instance of bookmark in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.tid, req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Removes a bookmark instance from the user account
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the logged-in user and tid identifying the primary
     * key of the tuit that need to be removed form the bookmarks list of the user
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    userUnBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnBookmarksTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status));

    /**
     * Checks if a tuit is bookmarked by the user or not.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including boolean result
     */
    checkIfATuitIsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.checkIfATuitIsBookmarkedByUser(req.params.uid,req.params.tid)
            .then(bookmarks => res.json(bookmarks))

    /**
     * Removes all bookmark instances from the user account
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the logged-in user and tid identifying the primary
     * key of the tuit that need to be removed form the bookmarks list of the user
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteAllBookmarksForUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.deleteAllBookmarksForUser(req.params.uid)
            .then(status => res.send(status));
};