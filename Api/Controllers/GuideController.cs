using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Tema.Plan.Domain;
using Api.Models;

namespace Api.Controllers
{
    public class GuideController : ApiController
    {
        private TemaContext db = new TemaContext();

        // GET api/Guide
        public IEnumerable<Guide> GetGuides()
        {
            return db.Guides.AsEnumerable();
        }

        // GET api/Guide/5
        public Guide GetGuide(int id)
        {
            Guide guide = db.Guides.Find(id);
            if (guide == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return guide;
        }

        // PUT api/Guide/5
        public HttpResponseMessage PutGuide(int id, Guide guide)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != guide.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(guide).State = EntityState.Modified;

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

        // POST api/Guide
        public HttpResponseMessage PostGuide(Guide guide)
        {
            if (ModelState.IsValid)
            {
                db.Guides.Add(guide);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, guide);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = guide.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Guide/5
        public HttpResponseMessage DeleteGuide(int id)
        {
            Guide guide = db.Guides.Find(id);
            if (guide == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Guides.Remove(guide);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, guide);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}