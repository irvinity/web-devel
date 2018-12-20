<?php

use Base\User as BaseUser;

/**
 * Skeleton subclass for representing a row from the 'user' table.
 *
 *
 *
 * You should add additional methods to this class to meet the
 * application requirements.  This class will only be generated as
 * long as it does not already exist in the output directory.
 *
 */
class User extends BaseUser
{
	function setPassword($p){
		return password_hash($p, PASSWORD_DEFAULT);	
	}
	function login($p){
		if(password_verify($p, $this->getPasswordHash()))
			return true;
		else
			return false;
	}
	function checkUser($identity){
		$user = UserQuery::create()
		->findOneByUserName($identity['username']);
		
		return $user;
	}
}
