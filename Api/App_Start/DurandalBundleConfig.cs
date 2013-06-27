using System;
using System.Web.Optimization;

namespace Api {
  public class DurandalBundleConfig {
    public static void RegisterBundles(BundleCollection bundles) {
      bundles.IgnoreList.Clear();
      AddDefaultIgnorePatterns(bundles.IgnoreList);

      bundles.Add(
        new ScriptBundle("~/scripts/vendor")
          .Include("~/Scripts/jquery-{version}.js")
          .Include("~/Scripts/knockout-{version}.js")
          .Include("~/Scripts/sammy-{version}.js")
          .Include("~/Scripts/bootstrap.min.js")
          .Include("~/Scripts/knockout.dirtyFlag.js")
          .Include("~/Scripts/moment.js")
          .Include("~/Scripts/moment-datepicker.js")
          .Include("~/Scripts/moment-datepicker-ko.js")
        );



      bundles.Add(
        new StyleBundle("~/Content/css")
          .Include("~/Content/ie10mobile.css")
          .Include("~/Content/bootstrap.css")
          .Include("~/Content/bootstrap-responsive.css")
          .Include("~/Content/font-awesome.min.css")
		  .Include("~/Content/durandal.css")
          .Include("~/Content/app.css")
        );
    }

    public static void AddDefaultIgnorePatterns(IgnoreList ignoreList) {
      if(ignoreList == null) {
        throw new ArgumentNullException("ignoreList");
      }

      ignoreList.Ignore("*.intellisense.js");
      ignoreList.Ignore("*-vsdoc.js");
      ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
      //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
      //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
    }
  }
}