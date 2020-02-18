package com.proyect.instarecipes.repositories;

import com.proyect.instarecipes.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriesRepository extends JpaRepository<Category, Long> {
    // List<User> findByLastName(String lastName);
    // List<User> findByFirstName(String firstName);
}