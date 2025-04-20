package com.aayush.joblisting.repository;

import java.util.List;

import com.aayush.joblisting.model.Post;

public interface SearchRepository {
	
	List<Post> findByText(String text);

}
