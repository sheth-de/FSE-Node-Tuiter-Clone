import {Request, Response} from "express";

/**
 * @file Declares a controller designed for the API of dislikes
 */
export default interface DislikeControllerI {
    findAllUsersThatDislikedTuit (req: Request, res: Response): void;
    findAllTuitsDislikedByUser (req: Request, res: Response): void;
    userTogglesTuitDislikes (req: Request, res: Response): void;
};