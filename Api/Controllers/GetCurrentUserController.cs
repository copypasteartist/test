using System;
using System.Security.Principal;
using System.Web.Http;

namespace Api.Controllers
{
    public class GetCurrentUserController : ApiController
    {
        public String Get()
        {
            var windowsIdentity = (WindowsIdentity)User.Identity;
            var userName = windowsIdentity.Name;

            return userName;
        }
    }
}
