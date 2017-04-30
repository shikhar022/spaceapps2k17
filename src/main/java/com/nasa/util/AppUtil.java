package com.nasa.util;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Copyright (C) $today.year,
 * Sunshine Teahouse Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by shikhar on 29-04-2017.
 */
public class AppUtil {

    public static List<String[]> readCsvFile(String csvFile) {
        BufferedReader br = null;
        String line = "";
        String csvSplitBy = ",";
        List<String[]> csvList = new ArrayList();
        try {
            br = new BufferedReader(new FileReader(csvFile));
            while ((line = br.readLine()) != null) {
                String[] csvData = line.trim().split(csvSplitBy);
                csvList.add(csvData);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return csvList;
    }
}
