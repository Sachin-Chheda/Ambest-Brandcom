# Analytics plan

## Event set

`service_view`, `service_select`, `case_view`, `quote_start`, `quote_offer_select`, `quote_submit_accepted`, `quote_submit_error`, `video_play`, reliable `video_complete`/progress and `contact_click`.

Allowed parameters are non-personal: division, service ID, offer ID, project ID, event context and page path. Never send name, email, phone, company, project text, token or a query string containing personal information.

## Conversion definitions

- Enquiry: server-side destination accepted the form.
- Qualified enquiry: a reviewed lead matches agreed criteria; website analytics cannot infer this alone.
- Proposal: an approved commercial proposal was issued.
- Sale: downstream business record confirms a purchase/engagement.

Only `quote_submit_accepted` is a website conversion. Button clicks and validation attempts are not accepted enquiries.

## Reporting

Report by page/division, market, source and defined conversion. State metric definition, period, comparison, likely explanation, uncertainty and next action. Audit existing tags before adding new measurement. No analytics code is included in this private build because property ownership, consent behavior and tag configuration were not supplied.
