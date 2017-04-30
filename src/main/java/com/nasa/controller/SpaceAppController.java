package com.nasa.controller;

import com.nasa.model.IceBergData;
import com.nasa.model.TemperatureData;
import com.nasa.service.SpaceAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Copyright (C) $today.year,
 * Sunshine Teahouse Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by shikhar on 29-04-2017.
 */

@RestController
@RequestMapping(value = "/api/")
public class SpaceAppController {

    @Autowired
    private SpaceAppService spaceAppService;

    @RequestMapping(method = RequestMethod.GET, value = "get-ocean-mass")
    public List<IceBergData> getGreenlandData() {
        return spaceAppService.getGreenlandData();
    }

    @RequestMapping(method = RequestMethod.GET, value = "get-temp-data")
    public List<TemperatureData> getTempData() {
        return spaceAppService.getTemperatureData();
    }

    @RequestMapping(method = RequestMethod.GET, value = "sea-to-temp-comp")
    public List<TemperatureData> getTempToSeaLevelData() {
        return spaceAppService.getTempToSeaLevelData();
    }

}
