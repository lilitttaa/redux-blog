import { nanoid } from "@reduxjs/toolkit";

let posts = [
    {
        id: nanoid(), title: 'A Random Post', content: 'Hello!', userId: '1', date: '2021-01-01T12:00:00.000Z',
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
    },
    {
        id: nanoid(), title: 'A Random Post', content: 'More text', userId: '2', date: '2021-01-01T12:00:00.000Z',
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
    },
];

export async function addNewFakePost(title:string,content:string,userId:string): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push({
                id: nanoid(),
                title,
                content,
                userId,
                date: new Date().toISOString(),
                reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
            });
            resolve({
                data: posts
            });
        }, 2000);
    });
}

export async function fakePosts(): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: posts
            })
        }, 2000);
    });
}

export async function fakeUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: [
                    { id: '1', name: 'Json' },
                    { id: '2', name: 'Lisa' },
                ]
            })
        }, 2000);
    });
}