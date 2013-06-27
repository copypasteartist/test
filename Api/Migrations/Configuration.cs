using Tema.Plan.Domain;

namespace Api.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Models.TemaContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

       
        protected override void Seed(Models.TemaContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            context.Destinations.AddOrUpdate(
              p => p.Code,
              new Destination() { Code = "LPA", Name = "Las Palmas"},
              new Destination() { Code = "HKT", Name = "Bankok"},
              new Destination() { Code = "PMI", Name = "Palma"}
            );

            context.Resorts.AddOrUpdate(
             p => p.Code,
             new Resort() { Code = "RR1", Name = "Resort 1" },
             new Resort() { Code = "RR2", Name = "Resort 2" },
             new Resort() { Code = "RR3", Name = "Resort 3" }
           );

            context.Guides.AddOrUpdate(
             p => p.Name,
             new Guide() { Name = "Pelle Svensson", Email = "p@b.se" }
            
           );

        }
    }


}
