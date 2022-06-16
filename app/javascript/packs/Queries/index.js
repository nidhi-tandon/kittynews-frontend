import gql from "graphql-tag";

export const FETCH_USER = gql`
    query FetchUser {
        viewer {
            id
        }
    }
`;

export const UPDATE_VOTE = gql`mutation upvote($postId: ID!) {
    voteAdd(postId: $postId) {
        errors
        post {
            votesCount
        }
    }
}`

export const REMOVE_VOTE = gql`mutation upvote($postId: ID!) {
    voteRemove(postId: $postId) {
        errors
        post {
            votesCount
        }
    }
}`

export const FETCH_ALL = gql`
    query PostsPage {
        postsAll {
            id
            title
            tagline
            url
            commentsCount
        }
    }
`;


export const fetchPost = (postId) => {
  return (
    gql`
        query PostsInfo {
            post(id: ${postId}) {
                id
                title
                tagline
                url
                commentsCount
                description
                commenters {
                    id
                    image
                    name
                    username
                }
                weeklyFeedPosition
                canBeVoted
                comments {
                    createdAt
                    id
                    text
                    user {
                        id
                        image
                        name
                        username
                    }
                }
                commentsCount
                createdAt
                dailyFeedPosition
                image
                isVoted
                makers {
                    id
                    image
                    name
                    username
                }
                tagline
                user {
                    id
                    image
                    name
                    username
                }
                viewsCount
                voters {
                    id
                    image
                    name
                    username
                }
                votesCount
                weeklyFeedPosition
            }
        }
    `
  )
}
