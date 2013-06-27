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
    public class SeasonController : ApiController
    {
        private TemaContext db = new TemaContext();

        // GET api/Season
        public IEnumerable<Season> GetSeasons()
        {
            return db.Seasons.AsEnumerable();
        }

        // GET api/Season/5
        public Season GetSeason(int id)
        {
            Season season = db.Seasons.Find(id);
            if (season == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return season;
        }

        // PUT api/Season/5
        public HttpResponseMessage PutSeason(int id, Season season)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != season.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(season).State = EntityState.Modified;

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

        // POST api/Season
        public HttpResponseMessage PostSeason(Season season)
        {
            if (ModelState.IsValid)
            {
                db.Seasons.Add(season);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, season);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = season.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Season/5
        public HttpResponseMessage DeleteSeason(int id)
        {
            Season season = db.Seasons.Find(id);
            if (season == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Seasons.Remove(season);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, season);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}