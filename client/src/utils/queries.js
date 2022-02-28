import { gql } from '@apollo/client';

export const GET_USERS = gql`
query users {
    users {
        username
        email
        location
        reputation
        hasReview
    }
}
`
export const GET_TOYS = gql`
query toys {
    toys {
        name
        price
        imageURL
        owner
        description
        comments {
            comment
            author
        }
    }
}
`

export const QUERY_ME = gql`
query me {
    me {
        username
        email
        location
        reputation
        hasReview
        listings {
            name
            price
            imageURL
            owner
            description
            comments {
                comment
                author
            }
        }
        reviewedUsers
    }
}
`