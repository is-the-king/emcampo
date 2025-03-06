package com.grash.repository;

import com.grash.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface AssetRepository extends JpaRepository<Asset, Long>, JpaSpecificationExecutor<Asset> {
    List<Asset> findByCompany_Id(Long id);

    Collection<Asset> findByParentAsset_Id(Long id);

    Integer countByParentAsset_Id(Long id);

    List<Asset> findByLocation_Id(Long id);

    Optional<Asset> findByNameIgnoreCaseAndCompany_Id(String assetName, Long companyId);

    Optional<Asset> findByIdAndCompany_Id(Long id, Long companyId);

    Optional<Asset> findByNfcIdAndCompany_Id(String nfcId, Long companyId);

    Optional<Asset> findByBarCodeAndCompany_Id(String data, Long id);

    List<Asset> findByCompany_IdAndCreatedAtBefore(Long id, Date date);
}

