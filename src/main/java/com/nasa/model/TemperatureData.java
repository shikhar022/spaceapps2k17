package com.nasa.model;

/**
 * Copyright (C) $today.year,
 * Sunshine Teahouse Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by shikhar on 29-04-2017.
 */
public class TemperatureData {
    private Integer year;
    private String temperaturePeak;
    private String temperatureMean;
    private Float seaLevel;

    public TemperatureData() {
    }

    public TemperatureData(String year, String tempMax, String tempMean) {
        this.year = Integer.parseInt(year);
        this.temperaturePeak = tempMax;
        this.temperatureMean = tempMean;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = Integer.parseInt(year);
    }

    public String getTemperaturePeak() {
        return temperaturePeak;
    }

    public void setTemperaturePeak(String temperaturePeak) {
        this.temperaturePeak = temperaturePeak;
    }

    public String getTemperatureMean() {
        return temperatureMean;
    }

    public void setTemperatureMean(String temperatureMean) {
        this.temperatureMean = temperatureMean;
    }

    public static TemperatureData convert(String[] strings){
        return new TemperatureData(strings[0],strings[1],strings[2]);
    }

    public Float getSeaLevel() {
        return seaLevel;
    }

    public void setSeaLevel(Float seaLevel) {
        this.seaLevel = seaLevel;
    }
}
