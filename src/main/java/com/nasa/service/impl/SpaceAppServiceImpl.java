package com.nasa.service.impl;

import com.nasa.model.IceBergData;
import com.nasa.model.TemperatureData;
import com.nasa.service.SpaceAppService;
import com.nasa.util.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Copyright (C) $today.year,
 * Sunshine Teahouse Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by shikhar on 29-04-2017.
 */
@Service
public class SpaceAppServiceImpl implements SpaceAppService {
    @Autowired
    Environment env;

    @Override
    public List<IceBergData> getGreenlandData() {
        List<String[]> csvFile= AppUtil.readCsvFile(env.getProperty("greenland.file.path"));
        List<IceBergData> dataList = csvFile.stream().map(IceBergData::convert).collect(Collectors.toList());

        Map<Integer,Double> oceanMass = dataList.stream().collect(
                Collectors.groupingBy(IceBergData::getYear, Collectors.averagingDouble(IceBergData::getOceanMass)));
        Map<Integer,Double> antarcticaMass = dataList.stream().collect(
                Collectors.groupingBy(IceBergData::getYear, Collectors.averagingDouble(IceBergData::getAntarticaMass)));
        Map<Integer,Double> greenlandMass = dataList.stream().collect(
                Collectors.groupingBy(IceBergData::getYear, Collectors.averagingDouble(IceBergData::getGreenlandMass)));

        List<IceBergData> iceBergDataList = oceanMass.keySet().stream()
                .map(year -> new IceBergData(oceanMass.get(year), antarcticaMass.get(year), greenlandMass.get(year), year))
                .sorted((o1, o2) -> o1.getYear().compareTo(o2.getYear())).collect(Collectors.toList());

        return iceBergDataList;
    }

    @Override
    public List<TemperatureData> getTemperatureData() {
        List<String[]> csvFile= AppUtil.readCsvFile(env.getProperty("temperature.file.path"));
        return csvFile.stream().map(TemperatureData::convert).sorted((o1, o2) -> o1.getYear().compareTo(o2.getYear()))
                .collect(Collectors.toList());
    }

    @Override
    public List<TemperatureData> getTempToSeaLevelData() {
        List<TemperatureData> temperatureDataList = getTemperatureData();
        Map<Integer,IceBergData> iceBergDataList = getGreenlandData().stream()
                .collect(Collectors.toMap(IceBergData::getYear, data -> data));

        temperatureDataList = temperatureDataList.stream()
                .filter(temperatureData -> temperatureData.getYear().intValue()>2002)
                .sorted((o1, o2) -> o1.getYear().compareTo(o2.getYear())).collect(Collectors.toList());

        for(TemperatureData temperatureData : temperatureDataList){
            temperatureData.setSeaLevel(iceBergDataList.get(temperatureData.getYear()).getOceanMass());
        }
        return temperatureDataList;
    }

}
