import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const longurl = new URL(req.url).searchParams.get('url')
	const token = "5muyBudWsWYqwPHOPEAKxCw0iBgv8wl3kOrYHA6zJflh7odf7Qy5kqhDJAU5";
	const body = JSON.stringify({
		url: longurl,
		domain: "tinyurl.com",
	});
	const ret = await fetch("https://api.tinyurl.com/create", {
		headers: {
			Authorization: `Bearer ${process.env.TINYURL_TOKEN ?? token}`,
			"Content-Type": "application/json",
		},
		body: body,
		method: "POST",
	});
	return NextResponse.json(
		{ url: (await ret.json()).data.tiny_url },
		{ status: ret.status },
	);
}
