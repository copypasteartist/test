using System;

namespace Tema.Plan.Domain
{
   public class Destination
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
    }
   public class Resort
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
    }

    public class Trip
    {
        public int Id { get; set; }
        public virtual int DestinationId { get; set; }
        public virtual Destination  Destination { get; set; }
        public virtual int ResortId { get; set; }
        public virtual Resort Resort { get; set; }
        public string Name { get; set; }
      
    }
    public class PlannedTrip
    {
        public int Id { get; set; }
        public string SeasonCode { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public int TripId { get; set; }
        public virtual Trip Trip { get; set; }
        public int GuideId { get; set; }
        public virtual Guide Guide { get; set; }
        public int StudId { get; set; }
        public virtual Guide Stud { get; set; }
        public int EnokId { get; set; }
        public bool Se { get; set; }
        public bool No { get; set; }
        public bool Dk { get; set; }
        public bool Fi { get; set; }
        public string ReservationNumber { get; set; }
        public string FlygprintPnr { get; set; }
        public int Pax { get; set; }
        public string DoubleBook { get; set; }
        public string AlsoGuides { get; set; }
        public string Remarks { get; set; }
        public string TravelingFunds { get; set; }
        public string GotFood { get; set; }
        public string Lists { get; set; }
        public string TicketSent { get; set; }
        public string AgentInformed { get; set; }
        public string InvoicePayed { get; set; }
        //public string TripDescription
        //{
        //    get
        //    {
        //        return  Trip.Destination.Code + " " + Trip.Resort.Code;
        //    }
        //}
        }

    public class Guide
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public class Season
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
    }
}
