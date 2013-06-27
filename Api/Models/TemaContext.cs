using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Tema.Plan.Domain;

namespace Api.Models
{
    public class TemaContext : DbContext
    {

        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Resort> Resorts { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Guide> Guides { get; set; }
        public DbSet<PlannedTrip> PlannedTrips { get; set; }
        public DbSet<Season> Seasons { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
           
        }
    }

}