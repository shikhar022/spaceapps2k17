package com.nasa.service;

import com.nasa.model.IceBergData;
import com.nasa.model.TemperatureData;

import java.util.List;

/**
 * Copyright (C) $today.year,
 * Sunshine Teahouse Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by shikhar on 29-04-2017.
 */
public interface SpaceAppService {
    public List<IceBergData> getGreenlandData();

    public List<TemperatureData> getTemperatureData();

    public List<TemperatureData> getTempToSeaLevelData();

}
