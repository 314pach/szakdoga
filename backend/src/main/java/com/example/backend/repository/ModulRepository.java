package com.example.backend.repository;

import com.example.backend.model.Modul;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModulRepository extends JpaRepository<Modul, Long> {
    @Query("SELECT modul FROM Modul modul WHERE modul.id in ?1")
    List<Modul> findAllById(List<Long> modulIds);

    List<Modul> findAllByCreator_Id(Long creatorId);
}
