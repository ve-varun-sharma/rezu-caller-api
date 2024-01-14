# rezu_caller_api

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.2. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Psudeocode

### Rezu Demo Endpoint

1. Create webook endpoint for inbound number

2. Get the Transcript and caller details

3. Summarize Transcript

4. Parse Reservation Start and End

5. Parse Full Name

6. Parse Number of guests

7. Update Demo calls Google Sheet

8. Send SMS to Guest making the reservation

9. Send CTA follow up text for using Rezu.
