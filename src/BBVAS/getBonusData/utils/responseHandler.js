// utils/responseHandler.js

export const successResponse = (res, data, status = 200) => res.status(status).json(data);
export const errorResponse = (res, message, status = 500) => res.status(status).json({ message });
export const notFoundResponse = (res, message = 'Resource not found') => res.status(404).json({ message });
export const badRequestResponse = (res, message = 'Bad request') => res.status(400).json({ message });
export const createdResponse = (res, data) => res.status(201).json(data);
export const noContentResponse = (res) => res.status(204).send();
export const unauthorizedResponse = (res, message = 'Unauthorized') => res.status(401).json({ message });
export const forbiddenResponse = (res, message = 'Forbidden') => res.status(403).json({ message });
export const conflictResponse = (res, message = 'Conflict') => res.status(409).json({ message });
export const internalServerErrorResponse = (res, message = 'Internal server error') => res.status(500).json({ message });
