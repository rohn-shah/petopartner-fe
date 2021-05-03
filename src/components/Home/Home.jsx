import React from "react";
import { Card, Grid, Typography } from "@material-ui/core";
import PetsIcon from "@material-ui/icons/Pets";
import Header from "../Header/Header";
import "./Home.css";
import Post from "../Post/Post";
import ContactUs from "../Forms/ContactUs";

function Home() {
  return (
    <div className="home">
      <Header type="absolute" color="transparent" />
      <div className="home__firstSlide">
        <img
          className="home__firstSlideImg"
          src="/assets/images/dog_sitting.jpg"
          alt="dog_sitting"
        />
      </div>
      <div className="home__secondSlide">
        <Grid container spacing={0}>
          <Grid item sm={6} md={6} lg={6} className="home__secondSlideLeft">
            <Typography className="custom-font textArea" variant="h3">
              Petopartner{" "}
            </Typography>
            <Typography className="textArea" variant="body1">
              Dogs are playful. They love physical activity such as going for
              walks, fetching sticks, leaping into ponds, and racing wildly to
              and fro. Dogs will join you for a jog or for a day in the park or
              even for an exhuberant game of frisbee. Yet dogs can also be soft
              and cuddly and ready at anytime for a loving pat and a reassuring
              hug. They're affectionate and they're soothing to stroke, plus
              most dogs can also remain calm when necessary and be tolerant of
              small children who don't yet know how to be quiet or to behave
              gently around animals.
            </Typography>
            <Typography className="textArea" variant="body1">
              Petopartner Provides a platform for Dog lover to find the most
              suitable partner for their pet. It allows users to find based on
              breed and different characteristics that the pet owner feels like
              a more suitable partner for their beloved pet
            </Typography>
          </Grid>
          <Grid item sm={4} md={4} lg={4} className="home__secondSlideRight">
            <Card style={{ height: "auto" }}>
              <Post
                dog={{
                  age: "3",
                  breed: "Dachshund",
                  name: "Tom",
                  likes: [1, 2, 3],
                  user: {
                    firstName: "Jenny",
                    lastName: "Doe",
                    photoURL:
                      "https://images.pexels.com/photos/4076339/pexels-photo-4076339.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                  },
                  photoURL:
                    "https://images.pexels.com/photos/1139795/pexels-photo-1139795.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                  description:
                    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod magnam consequuntur laborum quidem ipsa reprehenderit tenetur, sit dolore saepe totam perspiciatis ullam voluptatibus ea aut ut omnis veniam dolorem doloribus.",
                }}
                isDemo={true}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
      <div className="home__thirdSlide">
        <ContactUs />
      </div>
      <div className="home__footer">
        <div className="home__footerLeft">Petopartner</div>
        <PetsIcon />
      </div>
    </div>
  );
}

export default Home;
