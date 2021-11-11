import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_web3/ethereum.dart';
import 'package:flutter_web3/ethers.dart';
import 'package:http/http.dart';
import 'package:intl/intl.dart';
import 'package:timeago/timeago.dart' as timeago;
import 'package:web3dart/contracts/erc20.dart';
import 'package:web3dart/web3dart.dart';
import 'lat_lng.dart';
import 'place.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart' as intl;
import 'package:flutter/services.dart' show rootBundle;

Client httpClient = Client();
Web3Client ethClient = Web3Client(
    "https://mainnet.infura.io/v3/6a64571b9f134bc1913c6c24d5698891",
    httpClient);

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

Future<String> getCurrentTvl() async {
  final farmAbiCode = await rootBundle
      .loadString('assets/abi/0x7F4FE6776a9617847485d43db0d3A9b734e459C5.json');

  var farmPoolAddress =
      EthereumAddress.fromHex("0x7F4FE6776a9617847485d43db0d3A9b734e459C5");

  final farmPoolContract = DeployedContract(
      ContractAbi.fromJson(farmAbiCode, 'Farm Pool'), farmPoolAddress);

  final farmPoolGetEpoch = farmPoolContract.function('getCurrentEpoch');
  final farmPoolGetBalance = farmPoolContract.function('getEpochPoolSize');

  var currentPoolEpoch = await ethClient
      .call(contract: farmPoolContract, function: farmPoolGetEpoch, params: []);

  var currentBalanceBOND = await ethClient
      .call(contract: farmPoolContract, function: farmPoolGetBalance, params: [
    EthereumAddress.fromHex("0x0391D2021f89DC339F60Fff84546EA23E337750f"),
    currentPoolEpoch[0]
  ]);

  var currentBalanceSWINGBY = await ethClient
      .call(contract: farmPoolContract, function: farmPoolGetBalance, params: [
    EthereumAddress.fromHex("0x8287c7b963b405b7b8d467db9d79eec40625b13a"),
    currentPoolEpoch[0]
  ]);

  var currentBalanceXYZ = await ethClient
      .call(contract: farmPoolContract, function: farmPoolGetBalance, params: [
    EthereumAddress.fromHex("0x618679df9efcd19694bb1daa8d00718eacfa2883"),
    currentPoolEpoch[0]
  ]);

  double BONDBalance = currentBalanceBOND[0].toDouble() / 1000000000000000000;
  String response = "BOND : " +
      intl.NumberFormat.decimalPattern().format(BONDBalance).toString() +
      " \n";

  double SWINGBYBalance =
      currentBalanceSWINGBY[0].toDouble() / 1000000000000000000;
  response = response +
      "SWINGBY : " +
      intl.NumberFormat.decimalPattern().format(SWINGBYBalance).toString() +
      " \n";

  double XYZBalance = currentBalanceXYZ[0].toDouble() / 1000000000000000000;
  response = response +
      "XYZ : " +
      intl.NumberFormat.decimalPattern().format(XYZBalance).toString();

  return response;
}

Future<String> getUserAddress() async {
  // `Ethereum.isSupported` is the same as `ethereum != null`
  if (ethereum != null) {
    try {
      // Prompt user to connect to the provider, i.e. confirm the connection modal
      final accs =
          await ethereum.requestAccount(); // Get all accounts in node disposal
      accs; // [foo,bar]
      return accs[0];
    } on EthereumUserRejected {
      print('User rejected the modal');
    }
  }
  return "";
}

Future<String> getTokensInWallet(String address) async {
  var ethAddress = EthereumAddress.fromHex(address);

  var tokenContract =
      EthereumAddress.fromHex("0xda0c94c73d127ee191955fb46bacd7ff999b2bcd");

  var token = Erc20(address: tokenContract, client: ethClient);

  var balance = await token.balanceOf(ethAddress);

  return intl.NumberFormat.decimalPattern()
      .format(balance.toDouble() / 1000000000000000000);
}

String getTokensInBONDFarm(String address) {
  return "to be implemented";
}

String getTokensInSWINGBYFarm(String address) {
  return "to be implemented";
}

String getTokensInXYZFarm(String address) {
  return "to be implemented";
}

String getTokensInSLPFarm(String address) {
  return "to be implemented";
}

String getTokensStaked(String address) {
  return "to be implemented";
}

String getTokensInWalletValue(String address) {
  return "to be implemented";
}

String getTokensInBONDFarmValue(String address) {
  return "to be implemented";
}

String getTokensInSWINGBYFarmValue(String address) {
  return "to be implemented";
}

String getTokensInXYZFarmValue(String address) {
  return "to be implmeented";
}

String getTokensInSLPFarmValue(String address) {
  return "to be implemented";
}

String getTokensStakedValue(String address) {
  return "to be implemented";
}
