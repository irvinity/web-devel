<?php

use Base\Comment as BaseComment;

/**
 * Skeleton subclass for representing a row from the 'comment' table.
 *
 *
 *
 * You should add additional methods to this class to meet the
 * application requirements.  This class will only be generated as
 * long as it does not already exist in the output directory.
 *
 */
class Comment extends BaseComment
{
    // Helper function to create a new comment record
    // $data has the id of the user and the comment body
    public function postNewComment($data){
        $comment = new Comment();
        $comment->setCreateTime(date("F j, Y, g:i a"));
        $comment->setAuthorId($data['user_id']);
        $comment->setBody($data['user_post']);
        $comment->save();
        return $comment;
    }
}
