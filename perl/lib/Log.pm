package Log;
use strict;
use warnings;
#use DateTime;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub protocol {
    my $self = shift;
    return @{ $self->_split_req }[2];
}

sub method {
    my $self = shift;
    return @{ $self->_split_req }[0];
}

sub path {
    my $self = shift;
    return @{ $self->_split_req }[1];
}

sub uri {
    my $self = shift;

# On-demand生成のやつ

#    my $req = $self->_split_req;
#
##URI is constructed from (1)Protocol, (2)Host, (3)Path
#
#    #(1) Protocol 'HTTP/1.0' -> 'http'
#    my $protocol = lc([split('/',$req->[2])]->[0]);
#
#    #(2) Host
#    my $host = $self->{host};
#
#    #(3) Path
#    my $path = $req->[1];

    # Cacheする感じで。
    return $self->{_composed_uri} //= do { lc([split('/',$self->protocol)]->[0]).'://'.$self->{host}.$self->path; };

}

sub time {
    my $self = shift;

    # Old-Good style, I prefer this ;-)
    # ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst)
    my ($sec,$min,$hour,$mday,$mon,$year) = gmtime $self->{epoch};

    # YYYY-MM-DDThh:mm:ss
    return sprintf("%04d-%02d-%02dT%02d:%02d:%02d",$year+1900,$mon+1,$mday,$hour,$min,$sec);

#    # Using DateTime looks cool...
#    my $dt = DateTime->from_epoch( epoch => $self->{epoch} ); # Default timezone is GMT
#    return $dt->strftime('%Y-%m-%dT%H:%M:%S');

#    # YYYY-MM-DDThh:mm:ss
#    return sprintf("%04d-%02d-%02dT%02d:%02d:%02d",$year+1900,$mon+1,$mday,$hour,$min,$sec);

}

sub _split_req {
    my $self = shift;

    # ['GET', '/apache_pb.gif', 'HTTP/1.0']
    return $self->{_splitted_req} //= do { [split(' ',$self->{req})] };
}

1;
