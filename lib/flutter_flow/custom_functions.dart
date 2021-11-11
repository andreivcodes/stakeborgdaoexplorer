import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:timeago/timeago.dart' as timeago;
import 'lat_lng.dart';
import 'place.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart' as intl;

Future<String> getCurrentPrice() async {
  var response = await http.get(
    Uri.parse(
        "https://api.coingecko.com/api/v3/simple/price?ids=stakeborg-dao&vs_currencies=USD"),
  );

  if (response.statusCode == 200) {
    return (jsonDecode(response.body)['stakeborg-dao']['usd'].toString());
  }
}

Future<String> getCurrentMcap() async {
  var currentPrice = await getCurrentPrice();
  return intl.NumberFormat.decimalPattern()
      .format(double.parse(currentPrice) * 20000000)
      .toString();
}

Future<String> getCurrentCirculatingMcap() async {
  var epoch0 = DateTime.fromMillisecondsSinceEpoch(1635840000000);
  var currentPrice = await getCurrentPrice();

  if (DateTime.now().isBefore(epoch0.add(Duration(days: 7 * 1)))) {
    return intl.NumberFormat.decimalPattern()
        .format(double.parse(currentPrice) * 69400)
        .toString();
  } else if (DateTime.now().isBefore(epoch0.add(Duration(days: 7 * 2)))) {
    return intl.NumberFormat.decimalPattern()
        .format(double.parse(currentPrice) * 154800)
        .toString();
  } else if (DateTime.now().isBefore(epoch0.add(Duration(days: 7 * 3)))) {
    return intl.NumberFormat.decimalPattern()
        .format(double.parse(currentPrice) * 255250)
        .toString();
  } else if (DateTime.now().isBefore(epoch0.add(Duration(days: 7 * 4)))) {
    return intl.NumberFormat.decimalPattern()
        .format(double.parse(currentPrice) * 405600)
        .toString();
  } else if (DateTime.now().isBefore(epoch0.add(Duration(days: 7 * 5)))) {
    return intl.NumberFormat.decimalPattern()
        .format(double.parse(currentPrice) * 507600)
        .toString();
  } else if (DateTime.now().isBefore(epoch0.add(Duration(days: 7 * 6)))) {
    return intl.NumberFormat.decimalPattern()
        .format(double.parse(currentPrice) * 622000)
        .toString();
  } else if (DateTime.now().isBefore(epoch0.add(Duration(days: 7 * 7)))) {
    return intl.NumberFormat.decimalPattern()
        .format(double.parse(currentPrice) * 734400)
        .toString();
  } else if (DateTime.now().isBefore(epoch0.add(Duration(days: 7 * 8)))) {
    return intl.NumberFormat.decimalPattern()
        .format(double.parse(currentPrice) * 850800)
        .toString();
  } else if (DateTime.now().isBefore(epoch0.add(Duration(days: 7 * 9)))) {
    return intl.NumberFormat.decimalPattern()
        .format(double.parse(currentPrice) * 966800)
        .toString();
  } else if (DateTime.now().isBefore(epoch0.add(Duration(days: 7 * 10)))) {
    return intl.NumberFormat.decimalPattern()
        .format(double.parse(currentPrice) * 1082800)
        .toString();
  } else if (DateTime.now().isBefore(epoch0.add(Duration(days: 7 * 11)))) {
    return intl.NumberFormat.decimalPattern()
        .format(double.parse(currentPrice) * 1173800)
        .toString();
  } else if (DateTime.now().isBefore(epoch0.add(Duration(days: 7 * 12)))) {
    return intl.NumberFormat.decimalPattern()
        .format(double.parse(currentPrice) * 1264800)
        .toString();
  }
}

String getCurrentTvl() {
  return "to be implemented";
}
