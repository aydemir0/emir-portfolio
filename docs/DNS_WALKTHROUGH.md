# How DNS Connects a Domain to a Website

When you type a domain into your browser, a few fast steps happen behind the scenes to find the actual server hosting the website.

## 1. The Browser and the Resolver
First, your browser needs to know the IP address of the server. It asks a **DNS Resolver** (usually provided by your internet service provider). The resolver acts like a librarian, searching the internet's address books for the right location.

## 2. Authoritative Nameservers
The resolver traces the request down to the **Authoritative Nameserver** for the domain. This nameserver holds the exact map for that specific domain. It looks at its configured **DNS Records** to see where traffic should go.

## 3. DNS Records (Like CNAME)
Often, modern hosting uses a **CNAME record**. A CNAME does not contain the website itself; instead, it maps one hostname to another hostname. For example, it tells the nameserver, "If someone looks for this custom domain, send them over to the hosting provider's default domain."

## 4. The Hosting Provider and HTTPS
Once the browser finally gets the correct IP address from this lookup process, it makes a connection to the hosting provider's server. To ensure privacy and security, they establish an encrypted **HTTPS request**. Finally, the hosting provider sends back the website response, and the page loads.

> **Note**: For this portfolio I currently use Vercel's hosted domain, so I do not need to configure a custom domain for this assignment. If I connect a custom domain later, DNS records will tell resolvers where that hostname should lead.
