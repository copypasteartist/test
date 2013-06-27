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
using Newtonsoft.Json;
using Tema.Plan.Domain;
using Api.Models;

namespace Api.Controllers
{
    public class ResortController : ApiController
    {
        private TemaContext db = new TemaContext();

        // GET api/Resort
        public IEnumerable<Resort> GetResorts()
        {
            return db.Resorts.AsEnumerable();
        }

        // GET api/Resort/5
        public Resort GetResort(int id)
        {
            Resort resort = db.Resorts.Find(id);
            if (resort == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return resort;
        }

        // PUT api/Resort/5
        public HttpResponseMessage PutResort(List<Resort> resorts)
        {
            var results = new List<object>();
            string action = null;
            foreach (var resort in resorts)
            {
                bool delete = resort.Id < 0;
                if (resort.Id == 0)
                {
                    //ny
                    action = "add";
                    db.Resorts.Add(resort);

                }
                else if (delete)
                {
                    //delete
                    action = "delete";
                    Resort resortToDelete = db.Resorts.Find(resort.Id * -1);
                    // trip.Id = trip.Id*-1;
                    db.Resorts.Remove(resortToDelete);
                }
                else
                {
                    //uppdaterad
                    action = "update";
                    db.Entry(resort).State = EntityState.Modified;
                }

                try
                {
                    results.Add(new
                    {
                        query = "ack",
                        command = JsonConvert.SerializeObject(action)
                    });
                    db.SaveChanges();
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
           
            //return Request.CreateResponse(HttpStatusCode.OK);
            //if (!ModelState.IsValid)
            //{
            //    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            //}

            //if (id != resort.Id)
            //{
            //    return Request.CreateResponse(HttpStatusCode.BadRequest);
            //}

            //db.Entry(resort).State = EntityState.Modified;

            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateConcurrencyException ex)
            //{
            //    return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            //}

            //return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/Resort
        public HttpResponseMessage PostResort(Resort resort)
        {
            if (ModelState.IsValid)
            {
                db.Resorts.Add(resort);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, resort);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = resort.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Resort/5
        public HttpResponseMessage DeleteResort(int id)
        {
            Resort resort = db.Resorts.Find(id);
            if (resort == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Resorts.Remove(resort);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, resort);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}