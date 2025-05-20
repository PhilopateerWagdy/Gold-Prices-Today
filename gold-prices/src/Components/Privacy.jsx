import React from "react";
import { useTranslation } from "react-i18next";

import VerticalAdsense from "./VerticalAdsense";
import HorzAdsense from "./HorzAdsense";

const Privacy = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-row justify-content-center m-4">
        <div className="border border-dark w-75 h-100 p-3">
          <h3 className="mb-4">{t("privacy")}</h3>
          <hr className="border border-dark w-100"></hr>

          <div style={{ whiteSpace: "pre-line" }}>
            {i18n.language === "ar" ? (
              <p>
                {`
                  عزيزي الزائر، خصوصيتك في غاية الأهمية بالنسبة لنا. توضح سياسة الخصوصية الواردة في هذه الوثيقة أنواع المعلومات الشخصية التي يجمعها موقع "أسعار الذهب اليوم" وكيفية استخدامها.

نستخدم شركات إعلانات خارجية لعرض الإعلانات. عند زيارتك لموقع "أسعار الذهب اليوم"، قد تستخدم هذه الشركات معلومات حول زياراتك لهذا الموقع (باستثناء اسمك أو عنوانك أو بريدك الإلكتروني أو رقم هاتفك) لعرض إعلانات حول السلع والخدمات التي تهمك عبر ملفات تعريف الارتباط.

نحن في موقع "أسعار الذهب اليوم" نستخدم إعلانات جوجل كمصدر دخل خارجي. لذلك، تستخدم جوجل ملفات تعريف الارتباط لعرض الإعلانات على موقعنا. تستخدم جوجل ملف تعريف الارتباط لعرض إعلانات "مبنية على الاهتمامات" للمستخدمين بناءً على زياراتهم لموقعنا. يمكن للزوار إلغاء استخدام ملف تعريف الارتباط من خلال زيارة سياسة خصوصية إعلانات جوجل وشبكة المحتوى.

يستخدم موردو الجهات الخارجية، بما في ذلك جوجل، ملفات تعريف الارتباط لعرض الإعلانات بناءً على زيارات المستخدم السابقة لموقعك أو مواقع أخرى.
يُمكّن استخدام جوجل لملفات تعريف الارتباط الإعلانية جوجل وشركائها من عرض إعلانات لمستخدميك بناءً على زياراتهم لمواقعك و/أو مواقع أخرى على الإنترنت.

يمكن للمستخدمين إلغاء الاشتراك في الإعلانات المخصصة بزيارة إعدادات الإعلانات. (أو يمكنك توجيه المستخدمين لإلغاء الاشتراك في استخدام جهات خارجية لملفات تعريف الارتباط للإعلانات المخصصة بزيارة www.aboutads.info).

وأخيرًا، وبموجب شروط هذه الاتفاقية، نحن مُلزمون بتوضيح كيفية تعطيل ملفات تعريف الارتباط. يمكنك القيام بذلك من خلال خيارات المتصفح، أو باتباع سياسة الخصوصية لإعلانات جوجل وشبكة المحتوى.

إذا كنت بحاجة إلى مزيد من المعلومات أو لديك أي أسئلة حول سياسة الخصوصية الخاصة بنا، يُرجى التواصل معنا عبر نموذج الاتصال، ضمن علامة التبويب "اتصل بنا".

تخضع شروط هذه السياسة للتغيير والتعديل في أي وقت نراه ضروريًا.
                  `}
              </p>
            ) : (
              <p>
                {`
                  Dear visitor, your privacy is extremely important to us. The privacy policy contained in this document outlines the types of personal information collected by the Gold Prices Today website and how this information is used.

We use third-party advertising companies to serve ads. When you visit the Gold Prices Today website in Egypt, these companies may use information about your visits to this website (except for your name, address, email address, or phone number) to provide advertisements about goods and services of interest to you via cookies.

We at the Gold Prices Today website use Google Ads as an external revenue source. Therefore, Google uses cookies to serve ads on our site. Google uses the cookie to serve ads "based on interests" to users based on their visits to our site. Visitors can opt out of the use of the cookie by visiting the Google Ads and Content Network privacy policy.

Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
Users may opt out of personalized advertising by visiting Ads Settings. (Alternatively, you can direct users to opt out of a third-party vendor's use of cookies for personalized advertising by visiting www.aboutads.info.)

Finally, under the terms of this agreement, we are obligated to show you how to disable cookies. You can do so through your browser options, or by following the privacy policy for Google ads and the content network.

If you require more information or have any questions about our privacy policy, please feel free to contact us via the contact form, under the Contact Us tab.

The terms of this policy are subject to change and modification at any time we deem necessary.
                  `}
              </p>
            )}
          </div>
        </div>
        <div className="border border-dark d-flex flex-column w-25 me-2">
          <VerticalAdsense />
          <VerticalAdsense />
        </div>
      </div>
      <div className="border border-dark mt-2 mb-4">
        <HorzAdsense />
      </div>
    </div>
  );
};

export default Privacy;
