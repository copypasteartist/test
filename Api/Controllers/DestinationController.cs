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
    public class DestinationController : ApiController
    {
        private TemaContext db = new TemaContext();

        // GET api/Destination
        public IEnumerable<Destination> GetDestinations()
        {
            return db.Destinations.AsEnumerable();
        }

        // GET api/Destination/5
        public Destination GetDestination(int id)
        {
            Destination destination = db.Destinations.Find(id);
            if (destination == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return destination;
        }

        // PUT api/Destination/5
        [HttpPut]
        public HttpResponseMessage PutDestination(Destination destination)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            //if (id != destination.Id)
            //{
            //    return Request.CreateResponse(HttpStatusCode.BadRequest);
            //}

            db.Entry(destination).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        
        // POST api/Destination
        [HttpPost]
        public HttpResponseMessage PostDestination(Destination destination)
        {
            if (ModelState.IsValid)
            {
                db.Destinations.Add(destination);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, destination);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = destination.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Destination/5
        [HttpDelete]
        public HttpResponseMessage DeleteDestination([FromUri]int Id)
        {
            Id = Id*-1;
            Destination destination = db.Destinations.Find(Id);
            if (destination == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Destinations.Remove(destination);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, destination);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}