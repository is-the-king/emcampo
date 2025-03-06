package com.grash.repository;

import com.grash.model.PreventiveMaintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.Date;
import java.util.List;

public interface PreventiveMaintenanceRepository extends JpaRepository<PreventiveMaintenance, Long>, JpaSpecificationExecutor<PreventiveMaintenance> {
    Collection<PreventiveMaintenance> findByCompany_Id(@Param("x") Long id);

    List<PreventiveMaintenance> findByCreatedAtBeforeAndCompany_Id(Date start, Long companyId);
}
