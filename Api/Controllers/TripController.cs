using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Tema.Plan.Domain;
using Api.Models;

namespace Api.Controllers
{
    public class TripController : ApiController
    {
        private readonly TemaContext _db = new TemaContext();

        // GET api/Trip
        public IEnumerable<Trip> GetTrips()
        {

            return _db.Trips.AsEnumerable();

          
        }

        // GET api/Trip/5
        public Trip GetTrip(int id)
        {
            Trip trip = _db.Trips.Find(id);
            if (trip == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return trip;
        }

        // PUT api/Trip/5
        //public HttpResponseMessage PutTrip(int id, Trip trip)
        public HttpResponseMessage PutTrip( List<Trip> trips)
        {
            var results = new List<object>();
            foreach (var trip in trips)
            {
                bool delete = trip.Id < 0;
                string action;
                if (trip.Id == 0)
                {
                    //ny
                    action = "add";
                    _db.Trips.Add(trip);
                    
                }
                else if (delete)
                {
                    //delete
                    action = "delete";
                    Trip tripToDelete = _db.Trips.Find(trip.Id * -1);
                   // trip.Id = trip.Id*-1;
                    _db.Trips.Remove(tripToDelete);
                }
                else
                {
                    //uppdaterad
                    action = "update";
                    _db.Entry(trip).State = EntityState.Modified;
                }

                try
                {
                    results.Add(new
                    {
                        query = "ack",
                        command = JsonConvert.SerializeObject(action)
                    });
                    _db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    results.Add(new
                    {
                        query = "nak",
                        command = JsonConvert.SerializeObject(action)
                    });

                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                }

              
            }

            return Request.CreateResponse(HttpStatusCode.OK, results);
        }

        // POST api/Trip
        public HttpResponseMessage PostTrip(Trip trip)
        {
            if (ModelState.IsValid)
            {
                _db.Trips.Add(trip);
                _db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, trip);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = trip.Id }));
                return response;
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
        }

        // DELETE api/Trip/5
        public HttpResponseMessage DeleteTrip(int id)
        {
            Trip trip = _db.Trips.Find(id);
            if (trip == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            _db.Trips.Remove(trip);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, trip);
        }

        protected override void Dispose(bool disposing)
        {
            _db.Dispose();
            base.Dispose(disposing);
        }
    }

    
}