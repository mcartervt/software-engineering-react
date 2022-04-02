/**
 * @file Houses the functions associated with Dislikes in
 *       React, including toggle.
 */

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL; //"https://cs5500-02.herokuapp.com";
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
    withCredentials: true
});

export const findAllTuitsDislikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);

export const findAllUsersThatDislikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/dislikes`)
        .then(response => response.data);

export const userDislikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);