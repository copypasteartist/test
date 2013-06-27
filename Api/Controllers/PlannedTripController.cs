using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Tema.Plan.Domain;
using Api.Models;

namespace Api.Controllers
{
   

    public class PlannedTripController : ApiController
    {
        private TemaContext db = new TemaContext();

        // GET api/PlannedTrip
        public IEnumerable<PlannedTrip> GetPlannedTrips()
        {
            var plannedtrips = db.PlannedTrips.Include(p => p.Trip).Include(p => p.Guide).Include(p => p.Stud);
            return plannedtrips.AsEnumerable();
        }

        // GET api/PlannedTrip/5
        public PlannedTrip GetPlannedTrip(int id)
        {
            PlannedTrip plannedtrip = db.PlannedTrips.Find(id);
            if (plannedtrip == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return plannedtrip;
        }

        // PUT api/PlannedTrip/5
        public HttpResponseMessage PutPlannedTrip(int id, PlannedTrip plannedtrip)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != plannedtrip.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(plannedtrip).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            //return Request.CreateResponse(HttpStatusCode.OK);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, plannedtrip);
            response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = plannedtrip.Id }));
            return response;
        }

        // POST api/PlannedTrip
        public HttpResponseMessage PostPlannedTrip(PlannedTrip plannedtrip)
        {
            //if (ModelState.IsValid)
            //{
                db.PlannedTrips.Add(plannedtrip);
                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                }
               

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, plannedtrip);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = plannedtrip.Id }));
                return response;
           
        }

        // DELETE api/PlannedTrip/5
        public HttpResponseMessage DeletePlannedTrip(int id)
        {
            PlannedTrip plannedtrip = db.PlannedTrips.Find(id);
            if (plannedtrip == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PlannedTrips.Remove(plannedtrip);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, plannedtrip);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}