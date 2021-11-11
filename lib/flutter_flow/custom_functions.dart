import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:timeago/timeago.dart' as timeago;
import 'lat_lng.dart';
import 'place.dart';

Future<String> getCurrentPrice() async {
  var http;
  var response = await http.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=stakeborg-dao&vs_currencies=USD",
  );

  if (response.statusCode == 200) {
    return (response.body);
  }
}

String getCurrentMcap() {
  return "tbd";
}

String getCurrentCirculatingMcap() {
  return "tbd";
}

String getCurrentTvl() {
  return "tbd";
}
