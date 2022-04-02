/**
 * @file Tests to show that the newly implemented Likes and Dislikes
 *       work in React/Netlify
 */

import {act, create} from 'react-test-renderer';
import TuitStats from "./tuit-stats";

test('stats render correctly, likes', () => {
    let stats = {
        likes: 123,
        replies: 234,
        retuits: 345,
        dislikes: 456
    }

    const likeTuit = () => {
        act(() => {
            stats.likes++;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    likeTuit={() => {}}
                />)
        })
    }


    let tuitStats
    // Create a likeTuit
    act(() => {
        tuitStats = create(
            <TuitStats
                likeTuit={likeTuit}
                tuit={{stats: stats}}/>
        );
    })


    const root = tuitStats.root;
    const likesCounter = root.findByProps({className: 'ttr-stats-likes'})
    const retuitsCounter = root.findByProps({className: 'ttr-stats-retuits'})
    const repliesCounter = root.findByProps({className: 'ttr-stats-replies'})
    const dislikesCounter = root.findByProps({className: 'ttr-stats-dislikes'})
    const likeTuitButton = root.findByProps(
        {className: 'ttr-like-tuit-click'})
    const dislikeTuitButton = root.findByProps(
        {className: 'ttr-dislike-tuit-click'})

    let likesText = likesCounter.children[0];
    const dislikesText = dislikesCounter.children[0];
    const repliesText = repliesCounter.children[0];
    const retuitsText = retuitsCounter.children[0];
    expect(likesText).toBe('123');
    expect(dislikesText).toBe('456');
    expect(repliesText).toBe('234');
    expect(retuitsText).toBe('345');

    act(() => {likeTuitButton.props.onClick()})
    likesText = likesCounter.children[0];
    expect(likesText).toBe('124');

});

// Test for increasing Dislikes
test('stats render correctly, dislikes', () => {
    let stats = {
        likes: 123,
        replies: 234,
        retuits: 345,
        dislikes: 456
    }


    // Dislike a Tuit
    const dislikeTuit = () => {
        act(() => {
            stats.dislikes++;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    dislikeTuit={() => {}}
                />)
        })
    }

    let tuitStats
    // Create a dislikeTuit
    act(() => {
        tuitStats = create(
            <TuitStats
                dislikeTuit={dislikeTuit}
                tuit={{stats: stats}}/>
        );
    })


    const root = tuitStats.root;
    const likesCounter = root.findByProps({className: 'ttr-stats-likes'})
    const retuitsCounter = root.findByProps({className: 'ttr-stats-retuits'})
    const repliesCounter = root.findByProps({className: 'ttr-stats-replies'})
    const dislikesCounter = root.findByProps({className: 'ttr-stats-dislikes'})
    const likeTuitButton = root.findByProps(
        {className: 'ttr-like-tuit-click'})
    const dislikeTuitButton = root.findByProps(
        {className: 'ttr-dislike-tuit-click'})

    const likesText = likesCounter.children[0];
    let dislikesText = dislikesCounter.children[0];
    const repliesText = repliesCounter.children[0];
    const retuitsText = retuitsCounter.children[0];
    expect(likesText).toBe('123');
    expect(dislikesText).toBe('456');
    expect(repliesText).toBe('234');
    expect(retuitsText).toBe('345');

    // Check dislikes
    act(() => {dislikeTuitButton.props.onClick()})
    dislikesText = dislikesCounter.children[0];
    expect(dislikesText).toBe('457');

});