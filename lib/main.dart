import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_web_plugins/flutter_web_plugins.dart';
import 'package:stakeborgdaoexplorer/address_page/address_page_widget.dart';
import 'package:stakeborgdaoexplorer/home_page/home_page_widget.dart';
import 'flutter_flow/flutter_flow_theme.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

void main() {
  setUrlStrategy(PathUrlStrategy());
  runApp(MyApp());
}

class Path {
  const Path(this.pattern, this.builder);

  final String pattern;
  final Widget Function(BuildContext, String) builder;
}

List<Path> paths = [
  Path(
    r'^' + HomePageWidget.route,
    (context, match) => HomePageWidget(),
  ),
  Path(
    r'^/address/([\w-]+)$',
    (context, match) => AddressPageWidget(inputAddress: match),
  ),
];

Route<dynamic> onGenerateRoute(RouteSettings settings) {
  for (Path path in paths) {
    final regExpPattern = RegExp(path.pattern);
    if (regExpPattern.hasMatch(settings.name)) {
      final firstMatch = regExpPattern.firstMatch(settings.name);
      final match = (firstMatch.groupCount == 1) ? firstMatch.group(1) : null;
      return MaterialPageRoute<void>(
        builder: (context) => path.builder(context, match),
        settings: settings,
      );
    }
  }
  // If no match is found, [WidgetsApp.onUnknownRoute] handles it.
  return null;
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'stakeborgdaoexplorer',
      localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [Locale('en', '')],
      theme: ThemeData(primarySwatch: Colors.blue),
      home: HomePageWidget(),
      onGenerateRoute: onGenerateRoute,
    );
  }
}
