package com.aayush.joblisting.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.aayush.joblisting.model.Post;

public interface PostRepository extends MongoRepository<Post, String> 
{

	
	

}
