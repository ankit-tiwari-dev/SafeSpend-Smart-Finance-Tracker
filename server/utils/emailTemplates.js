const getWelcomeEmailTemplate = (
  userName,
  signupMethod = "email",
  dashboardUrl = null
) => {
  const year = new Date().getFullYear();
  const defaultDashboardUrl =
    dashboardUrl ||
    (process.env.CLIENT_URL
      ? `${process.env.CLIENT_URL}/dashboard`
      : "https://safespend.app/dashboard");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Welcome to SafeSpend</title>
</head>

<body style="
  margin:0;
  padding:0;
  background-color:#050505;
  font-family:'Outfit',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  color:#ffffff;
">

<!-- Outer Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:40px 0;">
  <tr>
    <td align="center">

      <!-- Main Card -->
      <table width="600" cellpadding="0" cellspacing="0" style="
        background-color:#0f1115;
        border-radius:32px;
        overflow:hidden;
        border:1px solid rgba(255,255,255,0.06);
        box-shadow:0 20px 60px rgba(0,0,0,0.5);
      ">

        <!-- Header with Logo -->
        <tr>
          <td style="
            padding:56px 48px;
            text-align:center;
            background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);
            border-bottom:1px solid rgba(255,255,255,0.06);
          ">
            <!-- Logo Icon -->
            <div style="
              width:64px;
              height:64px;
              background:#0f172a;
              border-radius:20px;
              margin:0 auto 24px;
              display:inline-flex;
              align-items:center;
              justify-content:center;
              box-shadow:0 8px 32px rgba(15,23,42,0.4);
            ">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.21 15.89C20.5738 17.3945 19.5788 18.7202 18.3119 19.7513C17.0449 20.7824 15.5447 21.4874 13.9424 21.8048C12.3401 22.1221 10.6844 22.0421 9.12012 21.5718C7.55585 21.1014 6.13305 20.2551 4.97724 19.1066C3.82142 17.9582 2.96633 16.5412 2.48602 14.9808C2.00571 13.4203 1.91573 11.7658 2.22309 10.1646C2.53045 8.56345 3.22548 7.06059 4.24769 5.78718C5.26989 4.51377 6.58848 3.51027 8.09 2.86" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                <path d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z" fill="#00e5ff"/>
              </svg>
            </div>
            
            <h1 style="
              margin:0 0 12px;
              font-size:36px;
              font-weight:900;
              color:#ffffff;
              letter-spacing:-0.02em;
              text-transform:uppercase;
            ">
              SafeSpend
            </h1>
            <p style="
              margin:0;
              font-size:10px;
              color:rgba(0,229,255,0.6);
              letter-spacing:0.3em;
              text-transform:uppercase;
              font-weight:900;
            ">
              Premium 3.0
            </p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:56px 48px;">

            <!-- Welcome Message -->
            <div style="
              margin-bottom:32px;
              padding-bottom:32px;
              border-bottom:1px solid rgba(255,255,255,0.06);
            ">
              <h2 style="
                margin:0 0 16px;
                font-size:28px;
                font-weight:900;
                color:#ffffff;
                letter-spacing:-0.02em;
                text-transform:uppercase;
              ">
                Portal Access Granted
              </h2>
              <p style="
                margin:0;
                font-size:11px;
                line-height:1.8;
                color:rgba(255,255,255,0.4);
                letter-spacing:0.05em;
                font-weight:700;
              ">
                Welcome, <span style="color:#00e5ff;font-weight:900;">${userName || "Agent"}</span>
              </p>
            </div>

            <p style="
              margin:0 0 24px;
              font-size:14px;
              line-height:1.8;
              color:rgba(255,255,255,0.6);
              font-weight:500;
            ">
              Your SafeSpend institutional account has been successfully initialized using
              <strong style="color:#00e5ff;">${signupMethod === "google" ? "Google OAuth Protocol" : "Secure Email Authentication"}</strong>.
              You now have full access to the financial command center.
            </p>

            <!-- Status Indicator -->
            <div style="
              margin:32px 0;
              padding:20px 24px;
              background:rgba(0,229,255,0.05);
              border-left:3px solid #00e5ff;
              border-radius:16px;
            ">
              <p style="
                margin:0;
                font-size:12px;
                line-height:1.7;
                color:rgba(0,229,255,0.8);
                font-weight:700;
              ">
                <span style="font-size:16px;">⚡</span> <strong style="text-transform:uppercase;letter-spacing:0.1em;">System Status</strong><br/>
                All financial protocols are operational. Begin tracking capital flows immediately.
              </p>
            </div>

            <!-- Features Grid -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:40px 0;">
              <tr>
                <td width="50%" style="padding:0 8px 16px 0;">
                  <div style="
                    background:rgba(255,255,255,0.02);
                    border:1px solid rgba(255,255,255,0.06);
                    border-radius:20px;
                    padding:24px;
                    height:100%;
                  ">
                    <div style="
                      width:48px;
                      height:48px;
                      background:rgba(0,229,255,0.1);
                      border-radius:14px;
                      display:inline-flex;
                      align-items:center;
                      justify-content:center;
                      margin-bottom:16px;
                    ">
                      <span style="font-size:24px;">💳</span>
                    </div>
                    <h4 style="
                      margin:0 0 8px;
                      font-size:12px;
                      color:#ffffff;
                      font-weight:900;
                      text-transform:uppercase;
                      letter-spacing:0.15em;
                    ">Capital Tracking</h4>
                    <p style="
                      margin:0;
                      font-size:11px;
                      color:rgba(255,255,255,0.4);
                      line-height:1.6;
                      font-weight:600;
                    ">
                      Real-time inflow and outflow monitoring
                    </p>
                  </div>
                </td>
                <td width="50%" style="padding:0 0 16px 8px;">
                  <div style="
                    background:rgba(255,255,255,0.02);
                    border:1px solid rgba(255,255,255,0.06);
                    border-radius:20px;
                    padding:24px;
                    height:100%;
                  ">
                    <div style="
                      width:48px;
                      height:48px;
                      background:rgba(0,255,163,0.1);
                      border-radius:14px;
                      display:inline-flex;
                      align-items:center;
                      justify-content:center;
                      margin-bottom:16px;
                    ">
                      <span style="font-size:24px;">📊</span>
                    </div>
                    <h4 style="
                      margin:0 0 8px;
                      font-size:12px;
                      color:#ffffff;
                      font-weight:900;
                      text-transform:uppercase;
                      letter-spacing:0.15em;
                    ">Strategic Rails</h4>
                    <p style="
                      margin:0;
                      font-size:11px;
                      color:rgba(255,255,255,0.4);
                      line-height:1.6;
                      font-weight:600;
                    ">
                      Deploy budgetary protocols and objectives
                    </p>
                  </div>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <div style="text-align:center;margin:48px 0 32px;">
              <a href="${defaultDashboardUrl}" style="
                display:inline-block;
                padding:18px 56px;
                background:#00e5ff;
                color:#050505;
                text-decoration:none;
                font-size:11px;
                font-weight:900;
                border-radius:16px;
                text-transform:uppercase;
                letter-spacing:0.2em;
                box-shadow:0 12px 32px rgba(0,229,255,0.3);
              ">
                Access Command Center
              </a>
            </div>

            <!-- Security Notice -->
            <div style="
              background:rgba(16,185,129,0.05);
              border-left:3px solid #00ffa3;
              padding:18px 20px;
              border-radius:12px;
            ">
              <p style="
                margin:0;
                font-size:11px;
                color:rgba(0,255,163,0.7);
                line-height:1.7;
                font-weight:700;
              ">
                🔐 <strong style="text-transform:uppercase;letter-spacing:0.1em;">Elite Security Protocol</strong><br/>
                Your financial intelligence is protected by institutional-grade encryption and multi-layer authentication.
              </p>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="
            background:rgba(0,0,0,0.3);
            padding:32px 48px;
            text-align:center;
            border-top:1px solid rgba(255,255,255,0.06);
          ">
            <p style="
              margin:0 0 12px;
              font-size:10px;
              color:rgba(255,255,255,0.3);
              letter-spacing:0.1em;
              text-transform:uppercase;
              font-weight:900;
            ">
              Need tactical support? Access the Help Protocol.
            </p>
            <p style="
              margin:0;
              font-size:9px;
              color:rgba(255,255,255,0.2);
              letter-spacing:0.05em;
              font-weight:700;
            ">
              © ${year} SafeSpend Technologies Inc. All rights reserved.
            </p>
            <div style="
              margin-top:16px;
              padding-top:16px;
              border-top:1px solid rgba(255,255,255,0.03);
            ">
              <span style="
                display:inline-block;
                width:8px;
                height:8px;
                background:#00ffa3;
                border-radius:50%;
                margin-right:8px;
                box-shadow:0 0 8px rgba(0,255,163,0.5);
              "></span>
              <span style="
                font-size:9px;
                color:rgba(0,255,163,0.6);
                text-transform:uppercase;
                letter-spacing:0.2em;
                font-weight:900;
              ">System Online</span>
            </div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>
`;
};

const getOTPEmailTemplate = (otpCode) => {
  const year = new Date().getFullYear();
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>SafeSpend Verification Code</title>
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Outfit',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#ffffff;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:40px 10px;">
  <tr>
    <td align="center">
      <table width="500" cellpadding="0" cellspacing="0" style="background-color:#0f1115;border-radius:32px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);">
        <tr>
          <td style="padding:48px;text-align:center;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);">
            <h1 style="margin:0;font-size:24px;font-weight:900;color:#ffffff;letter-spacing:0.1em;text-transform:uppercase;">SafeSpend Security</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:48px;">
            <h2 style="margin:0 0 16px;font-size:22px;font-weight:900;color:#ffffff;text-transform:uppercase;">Verification Required</h2>
            <p style="margin:0 0 32px;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;font-weight:500;">
              Use the following security code to authenticate your request. This code will expire in 10 minutes.
            </p>
            <div style="background:rgba(0,229,255,0.05);border:1px solid rgba(0,229,255,0.2);padding:32px;border-radius:24px;text-align:center;">
              <span style="font-size:48px;font-weight:900;color:#00e5ff;letter-spacing:12px;">${otpCode}</span>
            </div>
            <p style="margin:32px 0 0;font-size:12px;color:rgba(255,255,255,0.4);line-height:1.6;font-weight:600;text-align:center;">
              If you did not initiate this request, please ignore this email or contact security support.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:rgba(0,0,0,0.3);padding:24px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.2);letter-spacing:0.05em;font-weight:700;">
              © ${year} SafeSpend Technologies Inc. Secure Protocol.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
`;
};

export { getWelcomeEmailTemplate, getOTPEmailTemplate };
