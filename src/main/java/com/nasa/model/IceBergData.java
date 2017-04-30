package com.nasa.model;

import java.text.SimpleDateFormat;

/**
 * Copyright (C) $today.year,
 * Sunshine Teahouse Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by shikhar on 29-04-2017.
 *
 * Latitude,
 * Longitude,
 * Ellipsoid_Elevation,
 * dH/dt,
 * Test_Date,
 * Test_Time,
 * Ref_Date,
 * Ref_Time,
 * Trajectory_Separation,
 * Number_Of_Pairs_Used,
 * RMS_Error
 *
 */


public class IceBergData {

    private static final SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");

    private Integer year;
    private Float greenlandMass;
    private Float antarticaMass;
    private Float oceanMass;

    public IceBergData(Double oceanMass, Double antarticaMass, Double greenlandMass, Integer year) {
        this.oceanMass = oceanMass.floatValue();
        this.greenlandMass = greenlandMass.floatValue();
        this.antarticaMass = antarticaMass.floatValue();
        this.year = year;
    }

    public IceBergData() {

    }

    public Integer getYear() {
        return year;
    }

    public void setYear(String year) {
        Float yearinfloat = Float.parseFloat(year);
        this.year = yearinfloat.intValue();
    }

    public Float getGreenlandMass() {
        return greenlandMass;
    }

    public void setGreenlandMass(String greenlandMass) {
        this.greenlandMass = Float.parseFloat(greenlandMass);
    }

    public Float getAntarticaMass() {
        return antarticaMass;
    }

    public void setAntarticaMass(String antarticaMass) {
        this.antarticaMass = Float.parseFloat(antarticaMass);
    }

    public Float getOceanMass() {
        return oceanMass;
    }

    public void setOceanMass(String oceanMass) {
        this.oceanMass = Float.parseFloat(oceanMass);
    }

    public static IceBergData convert(String[] strings){
        IceBergData iceBergData = new IceBergData();

        iceBergData.setYear(strings[0]);
        iceBergData.setGreenlandMass(strings[1]);
        iceBergData.setAntarticaMass(strings[2]);
        iceBergData.setOceanMass(strings[3]);

        return iceBergData;
    }

}
