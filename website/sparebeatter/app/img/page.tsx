import { style, elem } from "../api/img/style";

export default function Page() {
	const option = (
		<>
			<div style={style.hard}>HARD </div>
			<div style={style.Track_layout}>RANDOM</div>
			<div style={style.Track_layout}>MIRROR</div>
			<div style={style.Track_bind}>BIND</div>
		</>
	);
	return elem(option, {});
}
