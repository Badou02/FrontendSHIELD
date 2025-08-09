import React from "react";
import './Localisation.css'
const localisation = () =>{
    return (
    <div className="loca" > 
    <h2 className="visitePar"><i class="fa-solid fa-location-dot"></i> Envie de nous rendre visite ? <br/>
     Trouvez facilement notre boutique et venez échanger avec notre équipe chaleureuse !</h2>
        <div  data-aos="flip-down" >
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26686.547753005143!2d-17.332670133197606!3d14.788244900453146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec10a60477cb989%3A0xe022398974953293!2sKeur%20Massar!5e1!3m2!1sfr!2ssn!4v1748974436745!5m2!1sfr!2ssn"
         allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="loca"></iframe>
        </div>
    </div>
        );
};
export default localisation;