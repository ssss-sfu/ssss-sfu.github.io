import { useEffect } from "react";

// Source: https://help.embedsocial.com/en/articles/4797000-how-to-embed-code-in-a-react-application
export const EmbedSocialWidget = () => {
  useEffect(() => {
    (function (d, s, id) {
      var js;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://embedsocial.com/cdn/ht.js";
      d.getElementsByTagName("head")[0].appendChild(js);
    })(document, "script", "EmbedSocialHashtagScript");
  }, []);

  return (
    <div
      class="embedsocial-hashtag"
      data-ref="d99f3c2f5873b36f57baa423a4fcba2ba39839ef"
    >
      <a
        class="feed-powered-by-es feed-powered-by-es-feed-new"
        href="https://embedsocial.com/social-media-aggregator/"
        target="_blank"
        title="Widget by EmbedSocial"
      >
        SFU SSSS Instagram Feed
      </a>
    </div>
  );
};
